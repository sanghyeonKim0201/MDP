package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.gson.JsonObject;

import org.json.JSONObject;

import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Scheduler;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.schedulers.Schedulers;

public class LoginActivity extends AppCompatActivity implements JsonDataToServer {
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
                JsonObject json = new JsonObject();
                for(int i = 0; i < txtBox.length; i++){
                    json.addProperty("userId,userPw".split(",")[i], txtBox[i].getText().toString());
                }
                Observable<String> obs = jsonToServer(url, json, "POST"); //get요청에는 Request body를 담을 수 없어서 post로 보냄 url에 담는거 보안 상 위험(https가 최고의 방법)
                obs.subscribe(r->{
                    if(r.equals("FAIL")){
                        builder.setTitle("경고").setMessage("아이디 또는 비밀번호가 일치하지 않습니다").create().show();
                        return;
                    }else{
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