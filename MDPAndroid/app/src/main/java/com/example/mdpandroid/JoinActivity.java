package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

public class JoinActivity extends AppCompatActivity {

    EditText[] txtBox = new EditText[7];
    Button[] btn = new Button[4];
    AlertDialog.Builder builder;
    LinearLayout infoPages[] = new LinearLayout[2];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        data();

        infoPages[1].setVisibility(View.GONE);
        for(Button b : btn){
            b.setOnClickListener(a->{
                if(a.getId() == R.id.checkBtn){

                }else if(a.getId() == R.id.nextBtn){

                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 0 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.beforeBtn){
                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 1 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.signBtn){

                }
            });
        }
    }
    void data(){
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
    }
}