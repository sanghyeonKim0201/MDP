package com.example.mdpandroid;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.biometric.BiometricPrompt;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.concurrent.Executor;

import io.reactivex.rxjava3.core.Observable;

public class JoinActivity extends AppCompatActivity implements tools {
    private static final int REQUEST_CAMERA_PERMISSION = 100;
    private static final int REQUEST_IMAGE_CAPTURE = 200;
    EditText[] txtBox = new EditText[7];
    Button[] btn = new Button[4];
    Button imageCheck;
    ImageView imageView;
    AlertDialog.Builder builder;
    LinearLayout infoPages[] = new LinearLayout[2];
    Boolean check = false;
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    ArrayList<String> imageArr = new ArrayList();
    Bitmap imageBitmap;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        data();
        event();
        imageView.setImageResource(R.drawable.ic_launcher_background);
        infoPages[1].setVisibility(View.GONE);

    }
    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
        } else {
            Toast.makeText(this, "No camera app available", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            imageBitmap = (Bitmap) extras.get("data");
            imageView.setImageBitmap(imageBitmap);
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_CAMERA_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                openCamera();
            } else {
                Toast.makeText(this, "Camera permission denied", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream);
        byte[] imageBytes = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(imageBytes, Base64.DEFAULT);
    }
    void event(){
        imageView.setOnClickListener(a->{
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{android.Manifest.permission.CAMERA},
                        REQUEST_CAMERA_PERMISSION);
            } else {
                openCamera();
            }
        });
        imageCheck.setOnClickListener(a->{
            String imageData = bitmapToBase64(imageBitmap);
//            String url = pref.getString("ip", null) + "/api/users/picture";
        });
        for(Button b : btn){
            b.setOnClickListener(a->{
                if(a.getId() == R.id.checkBtn){
                    if(txtBox[1].getText().equals("")){
                        builder.setTitle("경고").setMessage("아이디를 입력하세요");
                        return;
                    }
                    String url = pref.getString("ip", null) + "/api/users?userId=" +  txtBox[1].getText();
                    Observable obs = jsonToServer(url, null, "GET", null);
                    obs.subscribe(r->{
                        if(r.equals("FAIL")){
                            builder.setTitle("경고").setMessage("이미 존재하는 아이디입니다");
                            builder.create().show();
                            check = false;
                            return;
                        }else{
                            builder.setTitle("정보").setMessage("사용가능한 아이디 입니다").create().show();
                            check = true;
                            return;
                        }
                    });
                }else if(a.getId() == R.id.nextBtn){
                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 0 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.beforeBtn){
                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 1 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.signBtn){
                    for(EditText t : txtBox){
                        if(t.getText().equals("")){
                            builder.setTitle("경고").setMessage("빈칸이 존재합니다").create().show();
                            return;
                        }
                    }
//                    if(!txtBox[0].getText().toString().matches(".*[ㄱ_힣].*")){
//                        builder.setTitle("경고").setMessage("한글 이름 칸은 한글만 사용 가능 합니다").create().show();
//                        return;
//                    }


                    if(check=false){
                        builder.setTitle("경고").setMessage("아이디 중복 확인을 해주십시오").create().show();
                        return;
                    }
//                    if(!txtBox[2].getText().equals(txtBox[3].getText())){
//                        builder.setTitle("경고").setMessage("비밀번호와 비밀번호 확인이 다릅니다").create().show();
//                        return;
//                    }
//
//                    if(!txtBox[4].getText().toString().matches("\\d{4}-\\d{2}-\\d{2}")){
//                        builder.setTitle("경고").setMessage("날짜 형식은 yyyy-MM-dd입니다").create().show();
//                        return;
//                    }
//                    try {
//                        if(LocalDate.parse(txtBox[4].getText()).toEpochDay() > LocalDate.now().toEpochDay()){
//                            builder.setTitle("경고").setMessage("미래의 날짜 입니다").create().show();
//                            return;
//                        }
//                    }catch (Exception e){
//                        builder.setTitle("경고").setMessage("존재하지 않는 날짜 입니다").create().show();
//                        return;
//                    }
//                    if(!txtBox[5].getText().toString().matches("010-\\d{4}-\\d{4}")){
//                        builder.setTitle("경고").setMessage("전화번호 형식은 010-0000-0000입니다").create().show();
//                        return;
//                    }
//                    if(!txtBox[6].getText().toString().matches(".*[a-zA-Z].*")){
//                        builder.setTitle("경고").setMessage("영어 이름 칸은 알파벳만 사용 가능 합니다").create().show();
//                        return;
//                    }

//                    if(imageArr.size() < 5){
//                        builder.setTitle("경고").setMessage(5 - imageArr.size() + "번 사진을 더 찍어 주세요").create().show();
//                        return;
//                    }

                    String url = pref.getString("ip", null) + "/api/users/join";
                    JSONObject json = new JSONObject();
                    for(int i = 0; i < txtBox.length; i++){
                        if(i == 3)continue;
                        try{
                            json.put("userName1,userId,userPw,,userBirth,userPhone,userName2".split(",")[i], txtBox[i].getText());
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }

                    Observable obs = jsonToServer(url, json, "POST", null);
                    obs.subscribe(e->{
                       if(e.equals("FAIL")){
                           builder.setTitle("경고").setMessage("회원가입에 실패하였습니다").create().show();
                           return;
                       }
                       builder.setTitle("정보").setMessage("회원가입이 완료되었습니다").create().show();

                       finish();
                    });
                }
            });
        }
    }
    void data(){
        imageCheck = findViewById(R.id.imageCheck);
        imageView = findViewById(R.id.imageView);
        for(int i = 0; i < txtBox.length; i++){
            txtBox[i] = findViewById(new int[]{R.id.nameKoTxt, R.id.userId, R.id.userPw, R.id.userPwCheck,
            R.id.userBirth, R.id.userPhone, R.id.nameEn}[i]);
        }
        for(int i = 0; i < btn.length; i++){
            btn[i] = findViewById(new int[]{R.id.checkBtn, R.id.nextBtn, R.id.beforeBtn, R.id.signBtn}[i]);
        }
        builder = new AlertDialog.Builder(JoinActivity.this);
        for(int i = 0; i < infoPages.length; i++){
            infoPages[i] = findViewById(new int[]{R.id.infoPage1, R.id.infoPage2}[i]);
        }
        pref = getSharedPreferences("pref", Activity.MODE_PRIVATE);
        editor = pref.edit();
    }
}