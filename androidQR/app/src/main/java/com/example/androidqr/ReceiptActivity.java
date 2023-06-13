package com.example.androidqr;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.journeyapps.barcodescanner.BarcodeEncoder;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.reactivex.rxjava3.core.Observable;

public class ReceiptActivity extends AppCompatActivity implements tools {

    TextView txt[] = new TextView[8];
    String scheduleNo;
    AlertDialog.Builder builder;
    Button infoBtn, infoBtn2;
    LinearLayout layout;
    PrintBluetooth printBT = new PrintBluetooth();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_receipt);

        loadData();
        event();
    }

    void loadData() {
        layout = findViewById(R.id.linearLayout5);
        infoBtn = findViewById(R.id.infoBtn);
        infoBtn2 = findViewById(R.id.infoBtn2);
        scheduleNo = getIntent().getStringExtra("scheduleNo");
        for (int i = 0; i < txt.length; i++) {
            txt[i] = findViewById(new int[]{R.id.depAirportName, R.id.depAirportId, R.id.arrAirportName, R.id.arrAirportId, R.id.depTime, R.id.airlineName, R.id.vihicleId, R.id.arrTime}[i]);
        }
        String url = getIntent().getStringExtra("url");
        SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);

        Observable obs = jsonToServer(url, null, "GET", null);
        obs.subscribe(a -> {
            if (a.equals("FAIL")) {
                Toast.makeText(getApplicationContext(), "불러오기 실패", Toast.LENGTH_SHORT).show();
                return;
            }
            System.out.println("ASDASDASDASD");
            try {
                BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
                //회원 인증을 위한 회원정보를 담고 있는 QR코드 생성
//            Bitmap bitmap = barcodeEncoder.encodeBitmap(pref.getString("ip", null) +  "/api/users/" + pref.getString("userNo", null), BarcodeFormat.QR_CODE, 200, 200);
                Bitmap bitmap = barcodeEncoder.encodeBitmap(url, BarcodeFormat.QR_CODE, 200, 200);
                ImageView image = findViewById(R.id.qrcode);
                image.setImageBitmap(bitmap);
            } catch (Exception e) {
                e.printStackTrace();
            }

            JSONObject json = new JSONObject(a.toString());

            for (int i = 0; i < txt.length; i++) {
                txt[i].setText(json.getString("depAirportName,depAirportId,arrAirportName,arrAirportId,depPlandTime,airlineName,vihicleId,arrPlandTime".split(",")[i]));
            }
        });
    }

    void event() {
        infoBtn2.setOnClickListener(a->{
            IntentIntegrator integrator = new IntentIntegrator(ReceiptActivity.this);
            integrator.setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES);
            integrator.setPrompt("Scan QR Code");
            integrator.setCameraId(0);
            integrator.setBeepEnabled(true);
            integrator.setBarcodeImageEnabled(false);
            integrator.setOrientationLocked(false);
            integrator.setCaptureActivity(OrientationCapture.class);
            integrator.initiateScan();
        });
        infoBtn.setOnClickListener(a -> {
            Bitmap bm1 = Bitmap.createBitmap(layout.getWidth(), layout.getHeight(), Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bm1);
            layout.draw(canvas);
            layout.setDrawingCacheEnabled(true);
            layout.buildDrawingCache();
            Bitmap bm = Bitmap.createScaledBitmap(layout.getDrawingCache(), 380, 380, true);

            try {
                printBT.findBT();
                printBT.openBT();
                printBT.printQrCode(bm);
                printBT.closeBT();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        });
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if(result != null){
            if(result.getContents() == null){
                Toast.makeText(this, "Cancel", Toast.LENGTH_SHORT).show();
            }else {
                Intent intent = new Intent(getApplicationContext(), ReceiptActivity.class);
                intent.putExtra("url", result.getContents());
                Toast.makeText(this, result.getContents(), Toast.LENGTH_SHORT).show();
                startActivity(intent);
                finish();
            }
        }else{
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}