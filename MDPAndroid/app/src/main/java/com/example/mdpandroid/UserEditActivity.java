package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import org.json.JSONObject;

import java.time.LocalDate;

import io.reactivex.rxjava3.core.Observable;

public class UserEditActivity extends AppCompatActivity implements tools {


    EditText[] txtBox = new EditText[7];
    Button[] btn = new Button[4];
    AlertDialog.Builder builder;
    LinearLayout infoPages[] = new LinearLayout[2];
    Boolean check = false;
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_edit);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        data();
        loadData();
        infoPages[1].setVisibility(View.GONE);
        event();
    }

    void data(){
        for(int i = 0; i < txtBox.length; i++){
            txtBox[i] = findViewById(new int[]{R.id.putNameKoTxt, R.id.putUserId, R.id.putUserPw, R.id.putUserPwCheck,
                    R.id.putUserBirth, R.id.putUserPhone, R.id.putNameEn}[i]);
        }
        for(int i = 0; i < btn.length; i++){
            btn[i] = findViewById(new int[]{R.id.putCheckBtn, R.id.putNextBtn, R.id.putBeforeBtn, R.id.putSignBtn}[i]);
        }
        builder = new AlertDialog.Builder(UserEditActivity.this);
        for(int i = 0; i < infoPages.length; i++){
            infoPages[i] = findViewById(new int[]{R.id.putInfoPage1, R.id.putInfoPage2}[i]);
        }
        pref = getSharedPreferences("pref", Activity.MODE_PRIVATE);
        editor = pref.edit();
    }
    void loadData(){
        SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);
        String url = pref.getString("ip", null) + "/api/users/" + pref.getString("userNo", null);
        Observable obs = jsonToServer(url, null, "GET", pref.getString("token", null));
        obs.subscribe(a->{
            try {
                if(a.equals("FAIL")){
                    builder.setTitle("경고").setMessage("다시 시도해주세요").create().show();
                    return;
                }
                JSONObject json = new JSONObject(a.toString()).getJSONObject("user");
                for(int i = 0; i < txtBox.length; i++){
                    if(i == 2 || i == 3)continue;
                    txtBox[i].setText(json.getString("userName1,userId,,,userBirth,userPhone,userName2".split(",")[i]));
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    void event(){
        for(Button b : btn){
            b.setOnClickListener(a->{
                if(a.getId() == R.id.putCheckBtn){
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
                        }
                        check = true;
                    });
                }else if(a.getId() == R.id.putNextBtn){
                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 0 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.putBeforeBtn){
                    for(int i = 0; i < infoPages.length; i++){
                        infoPages[i].setVisibility(i == 1 ? View.GONE : View.VISIBLE);
                    }
                }else if(a.getId() == R.id.putSignBtn){
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
                            builder.setTitle("경고").setMessage("정보수정에 실패하였습니다").create().show();
                            return;
                        }
                        builder.setTitle("정보").setMessage("정보수정이 완료되었습니다").create().show();
                        finish();
                    });
                }
            });
        }
    }
}