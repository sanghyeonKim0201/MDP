package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity implements JsonDataToServer {

    EditText[] txtBox = new EditText[2];
    Button[]btn = new Button[2];
    AlertDialog.Builder builder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        data();

        for(Button b : btn){
            b.setOnClickListener(a->{

                if(a.getId() == R.id.loginButton){
                    for(EditText t : txtBox){
                        if(t.getText().toString().equals("")){
                            builder.setTitle("경고").setMessage("빈칸이 존재합니다");
                            builder.create().show();
                            return;
                        }
                    }
                    new Thread(()->{
                        String url = "http://10.137.208.237:8080/api/users/login";//에뮬레이터는 localhost말고 다른 값 넣어야함
                        JSONObject json = new JSONObject();
                        try {
                            for(int i = 0; i < txtBox.length; i++){
                                json.put("userId,userPw".split(",")[i], txtBox[i].getText());
                            }
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                        JSONObject result = jsonToServer(url, json, "POST");
                        Log.i("login", result.toString());
                    }).start();

                }else{
                    Intent intent = new Intent(getApplicationContext(), JoinActivity.class);
                    startActivity(intent);
                }
            });
        }
    }
    void data(){
        for(int i = 0; i < txtBox.length; i++){
            txtBox[i] = findViewById(new int[]{R.id.idTxt, R.id.pwTxt}[i]);
        }
        for(int i = 0; i < btn.length; i++){
            btn[i] = findViewById(new int[]{R.id.loginButton, R.id.joinButton}[i]);
        }
        builder = new AlertDialog.Builder(LoginActivity.this);
    }
}