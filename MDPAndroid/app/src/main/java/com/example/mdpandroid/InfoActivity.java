package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.zxing.BarcodeFormat;
import com.journeyapps.barcodescanner.BarcodeEncoder;

import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.reactivex.rxjava3.core.Observable;

public class InfoActivity extends AppCompatActivity implements tools{

    TextView txt[] = new TextView[8];
    String scheduleNo;
    AlertDialog.Builder builder;
    Button infoBtn;
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        loadData();
        event();
    }
    void loadData(){
        builder = new AlertDialog.Builder(InfoActivity.this);
        infoBtn = findViewById(R.id.infoBtn);
        scheduleNo = getIntent().getStringExtra("scheduleNo");
        for(int i = 0; i < txt.length; i++){
            txt[i] = findViewById(new int[]{R.id.depAirportName, R.id.depAirportId, R.id.arrAirportName, R.id.arrAirportId, R.id.depTime, R.id.airlineName, R.id.vihicleId, R.id.arrTime}[i]);
        }
        pref = getSharedPreferences("pref", Activity.MODE_PRIVATE);
        editor = pref.edit();
        String url = pref.getString("ip", null) + "/api/schedules/" + scheduleNo;
//        String url =  "http://211.46.129.143:8080/api/schedules/" + scheduleNo;
        SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);

        Observable obs = jsonToServer(url, null, "GET", pref.getString("token", null));
        obs.subscribe(a->{
           if(a.equals("FAIL")){
               builder.setTitle("경고").setMessage("다시 시도해주세요").create().show();
               return;
           }

            try {
                BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
                //회원 인증을 위한 회원정보를 담고 있는 QR코드 생성
//            Bitmap bitmap = barcodeEncoder.encodeBitmap(pref.getString("ip", null) +  "/api/users/" + pref.getString("userNo", null), BarcodeFormat.QR_CODE, 200, 200);
                Bitmap bitmap = barcodeEncoder.encodeBitmap(url, BarcodeFormat.QR_CODE, 200, 200);
                ImageView image = findViewById(R.id.qrcode);
                image.setImageBitmap(bitmap);
            }catch (Exception e){
                e.printStackTrace();
            }

           JSONObject json = new JSONObject(a.toString());

           for(int i = 0; i < txt.length; i++){
               txt[i].setText(json.getString("depAirportName,depAirportId,arrAirportName,arrAirportId,depPlandTime,airlineName,vihicleId,arrPlandTime".split(",")[i]));
           }
           LocalDateTime date = LocalDateTime.parse(json.getString("arrPlandTime"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
           if(LocalDate.now().toEpochDay() > LocalDate.parse(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))).toEpochDay()){
                infoBtn.setText("DELETE");
           }else{
               infoBtn.setText("CANCEL");
           }
        });

//        try {
//            BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
//            //회원 인증을 위한 회원정보를 담고 있는 QR코드 생성
////            Bitmap bitmap = barcodeEncoder.encodeBitmap(pref.getString("ip", null) +  "/api/users/" + pref.getString("userNo", null), BarcodeFormat.QR_CODE, 200, 200);
//            Bitmap bitmap = barcodeEncoder.encodeBitmap(pref.getString("ip", null) +  "/api/schedules/" + getIntent().getStringExtra("no"), BarcodeFormat.QR_CODE, 200, 200);
//            ImageView image = findViewById(R.id.qrcode);
//            image.setImageBitmap(bitmap);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
    }
    void event(){
        infoBtn.setOnClickListener(a->{
            String url = pref.getString("ip", null) + "/api/schedules/" + scheduleNo;
            SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);

            Observable obs = jsonToServer(url, null, "DELETE", pref.getString("token", null));
            obs.subscribe(e->{
                if(e.equals("FAIL")){
                    builder.setTitle("경고").setMessage("다시 시도해 주세요").create().show();
                    return;
                }
                builder.setTitle("정보").setMessage("삭제 되었습니다").create().show();
                finish();
            });
        });
    }
}