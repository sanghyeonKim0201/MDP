package com.example.mdpandroid;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONStringer;

public class LoginActivity extends AppCompatActivity {

    EditText[] txtBox = {findViewById(R.id.id), findViewById(R.id.pw)};
    Button[] btn = {findViewById(R.id.loginButton), findViewById(R.id.joinButton)};
    AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        for(Button b : btn){
            b.setOnClickListener(a->{

                if(a.getId() == R.id.loginButton){
                    for(EditText t : txtBox){
                        if(t.getText().toString() == ""){
                            builder.setTitle("경고").setMessage("빈칸이 존재합니다");
                            builder.create().show();
                            return;
                        }
                    }
                    String url = "http://localhost:8080/api/users/login";
                    JSONStringer json = new JSONStringer();
                    String retMsg = "";
                    try {
                        retMsg = json.object().key("userId").value(txtBox[0].getText())
                                .key("userPw").value(txtBox[1].getText())
                                .endObject().toString();

                    }catch (Exception e){

                    }
                }else{

                }
            });
        }
    }
}