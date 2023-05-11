package com.example.mdpandroid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.widget.Button;
import android.widget.LinearLayout;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

import io.reactivex.rxjava3.core.Observable;

public class SeatActivity extends AppCompatActivity implements tools{

    LinearLayout seatPage;
    ArrayList<String> seat = new ArrayList<String>();
    SharedPreferences pref;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_seat);
        seatPage = findViewById(R.id.seatPage);
        try {
            loadData();
            loadSeat();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    void loadData(){
        pref = getSharedPreferences("pref", MODE_PRIVATE);
        String url = pref.getString("ip", null) + "/api/schedules/vihicleid/" + getIntent().getStringExtra("vihicleid");
        Observable obs = jsonToServer(url, null, "GET", pref.getString("token", null));
        obs.subscribe(a->{
            if(a.equals("FAIL")){
                return;
            }

            JSONArray jsonArray = new JSONObject(a.toString()).getJSONArray("list");
            for(int i = 0; i < jsonArray.length(); i++){
                seat.add(jsonArray.getJSONObject(i).getString("seat"));
            }
            Collections.sort(seat);
        });
    }
    void loadSeat(){
        int sum = 1;
        int idx = 0;
        for(int i = 0; i < 9; i++){
            LinearLayout layout = new Layout(getApplicationContext(), i % 4 == 0 ? 10 : 30);
            for(int j = 0; j < 5; j++){
                String seatNum = "A,B,C,D,E".split(",")[j] + sum;
                boolean using = seat.indexOf(String.valueOf(idx)) == -1 ? true : false;
                Button btn = new Btn(getApplicationContext(),
                        seatNum,
                        j % 2 == 0 ? 50 : 10, using);
                layout.addView(btn);
            }
            sum++;
            seatPage.addView(layout);
        }
    }

    class Btn extends AppCompatButton implements tools{

        String text;
        int margin;
        boolean using;
        public Btn(@NonNull Context context, String text, int margin, boolean using) {
            super(context);
            this.text = text;
            this.margin = margin;
            this.using = using;
            init(context);
        }
        void init(Context context){
            if(using){
                setBackgroundResource(R.drawable.seat_seat);
            }else{
                setBackgroundResource(R.drawable.seat_no);
            }
            DisplayMetrics display = getResources().getDisplayMetrics();
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 0, (int)dp(margin, display), 0);
            setLayoutParams(params);
            setText(text);
            setWidth((int)dp(30, display));
            setHeight((int)dp(30, display));
        }
    }
    class Layout extends LinearLayout implements tools{

        int margin;

        public Layout(Context context, int margin) {
            super(context);
            this.margin = margin;
            init(context);
        }
        void init(Context context){
            DisplayMetrics display = getResources().getDisplayMetrics();
            setOrientation(LinearLayout.HORIZONTAL);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 0, 0, (int) dp(margin, display));
            setLayoutParams(params);
        }
    }
}