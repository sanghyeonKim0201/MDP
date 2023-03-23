package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;

import io.reactivex.rxjava3.core.Observable;

public class LoginActivity extends AppCompatActivity implements tools {
    EditText[] txtBox = new EditText[2];
    Button btn;
    TextView joinTxt;
    AlertDialog.Builder builder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        data();

        joinTxt.setOnClickListener(a->{
            Intent intent = new Intent(getApplicationContext(), JoinActivity.class);
            startActivity(intent);
        });
        btn.setOnClickListener(a->{

            if(a.getId() == R.id.loginButton){
                for(EditText t : txtBox){
                    if(t.getText().toString().equals("")){
                        builder.setTitle("경고").setMessage("빈칸이 존재합니다").create().show();
                        return;
                    }
                }
                String url = "http://10.137.208.247:8080/api/users/login";
                JSONObject json = new JSONObject();
                try {
                    for(int i = 0; i < txtBox.length; i++){
                        json.put("userId,userPw".split(",")[i], txtBox[i].getText().toString());
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }
                Observable<String> obs = jsonToServer(url, json, "POST", null); //get요청에는 Request body를 담을 수 없어서 post로 보냄 url에 담는거 보안 상 위험(https가 최고의 방법)
                obs.subscribe(r->{
                    if(r.equals("FAIL")){
                        builder.setTitle("경고").setMessage("아이디 또는 비밀번호가 일치하지 않습니다").create().show();
                        return;
                    }else{
                        String token = new JSONObject(r.toString()).getString("token");

                        SharedPreferences pref = getSharedPreferences("pref", Activity.MODE_PRIVATE);
                        SharedPreferences.Editor editor = pref.edit();

                        editor.putString("token", token);
                        editor.putString("openAPI", "7lRppNnHg01uoL8pDhfJF3DAp8WVBgw0KGy01sVLzOaf0hgWe4ALjmk8NgWlQpYFaJcuNuXfLIHhVxP6oNpb%2BA%3D%3D");
                        JSONObject user = new JSONObject(r.toString()).getJSONObject("user");

                        editor.putString("userNo", user.getString("userNo"));
                        editor.apply();

                        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                        startActivity(intent);
                    }
                });
             }
        });

    }
    void data(){
        for(int i = 0; i < txtBox.length; i++){
            txtBox[i] = findViewById(new int[]{R.id.idTxt, R.id.pwTxt}[i]);
        }

        btn = findViewById(R.id.loginButton);
        joinTxt = findViewById(R.id.joinTxt);
        builder = new AlertDialog.Builder(LoginActivity.this);
    }

}