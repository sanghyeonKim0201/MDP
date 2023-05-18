package com.example.mdpandroid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
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

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;

import io.reactivex.rxjava3.core.Observable;

public class SeatActivity extends AppCompatActivity implements tools{

    LinearLayout seatPage;
    ArrayList<String> seat = new ArrayList<String>();
    SharedPreferences pref;

    String airlineNm;
    String arrAirportNm;
    String depAirportNm;
    String arrPlandTime;
    String depPlandTime;
    String vihicleId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_seat);
        seatPage = findViewById(R.id.seatPage);
        try {
            loadData();
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

            loadSeat();
        });
        airlineNm = getIntent().getStringExtra("airlineNm");
        arrAirportNm = getIntent().getStringExtra("arrAirportNm");
        depAirportNm = getIntent().getStringExtra("depAirportNm");
        arrPlandTime = getIntent().getStringExtra("arrPlandTime");
        depPlandTime = getIntent().getStringExtra("depPlandTime");
        vihicleId = getIntent().getStringExtra("vihicleid");
    }
    void loadSeat(){
        int sum = 1;
        for(int i = 0; i < 9; i++){
            LinearLayout layout = new Layout(getApplicationContext(), i % 4 == 0 ? 10 : 30);
            for(int j = 0; j < 5; j++){
                String seatNum = "A,B,C,D,E".split(",")[j] + sum;
                boolean using = seat.indexOf(seatNum) == -1 ? true : false;
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
            event();
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
        void event(){
            AlertDialog.Builder builder = new AlertDialog.Builder(SeatActivity.this);
            builder.setTitle("정보").setMessage("이 일정으로 예약하시겠습니까?");
            builder.setNegativeButton("아니오", (dialogInterface, i) -> {
                return;
            });
            builder.setPositiveButton("네", (dialogInterface, i) -> {
                try {

                    StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList");
                    urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + pref.getString("openAPI", null)); /*Service Key*/
                    urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

                    Observable airline = jsonToServer(urlBuilder.toString(), null, "GET", null);
                    airline.subscribe(a->{
                        JSONObject jsonObject = new JSONObject(a.toString());
                        JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
                        HashMap<String, Object> airLine = new HashMap<>();
                        for(int j=0; j <  jsonArray.length(); j++){
                            JSONObject item = jsonArray.getJSONObject(j);
                            airLine.put(item.getString("airlineId"), item.getString("airlineNm"));
                        }
                        JSONObject json = new JSONObject();
                        json.put("airlineName", airlineNm);
                        json.put("depAirportName", depAirportNm);
                        json.put("arrAirportName", arrAirportNm);
                        json.put("depAirportId", getIntent().getStringExtra("depAirportId"));
                        json.put("arrAirportId", getIntent().getStringExtra("arrAirportId"));
                        json.put("arrPlandTime", arrPlandTime);
                        json.put("depPlandTime", depPlandTime);
                        json.put("vihicleId", vihicleId);
                        json.put("airlineId", airLine.entrySet().stream().filter(e->e.getValue().toString().indexOf(airlineNm) != -1).map(e->e.getKey().toString()).findAny().get().toString());
                        String url = pref.getString("ip", null) + "/api/schedules/reservation";
                        Observable obs = jsonToServer(url, json, "POST", pref.getString("token", null));
                        obs.subscribe(e->{
                            if(e.equals("FAIL")){
                                builder.setTitle("경고").setMessage("항공권 예약에 실패하였습니다").create().show();
                                return;
                            }
                            builder.setTitle("정보").setMessage("항공권 예약에 성공하였습니다").create().show();
                            finish();
                        });
                    });
                }catch (Exception e){
                    e.printStackTrace();
                }
            });
            builder.show();

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