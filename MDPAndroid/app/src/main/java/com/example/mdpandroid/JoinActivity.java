package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import org.json.JSONObject;

import java.time.LocalDate;

import io.reactivex.rxjava3.core.Observable;

public class JoinActivity extends AppCompatActivity implements JsonDataToServer {

    EditText[] txtBox = new EditText[7];
    Button[] btn = new Button[4];
    AlertDialog.Builder builder;
    LinearLayout infoPages[] = new LinearLayout[2];
    Boolean check = false;
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
                    if(txtBox[1].getText().equals("")){
                        builder.setTitle("경고").setMessage("아이디를 입력하세요");
                        return;
                    }
                    String url = "http://10.137.208.237:8080/api/users/" +  txtBox[1].getText();
                    Observable obs = jsonToServer(url, null, "GET");
                    obs.subscribe(r->{
                        if(r == "FAIL"){
                            builder.setTitle("경고").setMessage("이미 존재하는 아이디입니다");
                            builder.create().show();
                            check = false;
                            return;
                        }
                        check = true;
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
                    if(!txtBox[0].getText().toString().matches(".*[ㄱ_힣].*")){
                        builder.setTitle("경고").setMessage("한글 이름 칸은 한글만 사용 가능 합니다").create().show();
                        return;
                    }

                    if(check=false){
                        builder.setTitle("경고").setMessage("아이디 중복 확인을 해주십시오").create().show();
                        return;
                    }
                    if(!txtBox[2].getText().equals(txtBox[3].getText())){
                        builder.setTitle("경고").setMessage("비밀번호와 비밀번호 확인이 다릅니다").create().show();
                        return;
                    }

                    if(!txtBox[4].getText().toString().matches("\\d{4}-\\d{2}-\\d{2}")){
                        builder.setTitle("경고").setMessage("날짜 형식은 yyyy-MM-dd입니다").create().show();
                        return;

                    }
                    try {
                        if(LocalDate.parse(txtBox[4].getText()).toEpochDay() > LocalDate.now().toEpochDay()){
                            builder.setTitle("경고").setMessage("미래의 날짜 입니다").create().show();
                            return;
                        }
                    }catch (Exception e){
                        builder.setTitle("경고").setMessage("존재하지 않는 날짜 입니다").create().show();
                        return;
                    }
                    if(!txtBox[5].getText().toString().matches("010-\\d{4}-\\d{4}")){
                        builder.setTitle("경고").setMessage("전화번호 형식은 010-0000-0000입니다").create().show();
                        return;
                    }
                    if(!txtBox[6].getText().toString().matches(".*[a-zA-Z].*")){
                        builder.setTitle("경고").setMessage("영어 이름 칸은 알파벳만 사용 가능 합니다").create().show();
                        return;
                    }

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