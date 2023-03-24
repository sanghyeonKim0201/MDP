package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import io.reactivex.rxjava3.core.Observable;

public class ScheduleListActivity extends AppCompatActivity implements tools{

    AlertDialog.Builder builder;
    LinearLayout scrollFrame;
    TextView infoCount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_schdeule_list);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        SharedPreferences pref = getSharedPreferences("pref", MODE_PRIVATE);
        SharedPreferences.Editor editor= pref.edit();

        data();

        String url = "http://10.137.208.247:8080/api/schedules?userNo=" + pref.getString("userNo", null);
        System.out.println(pref.getString("userNo", null) + ", " + pref.getString("token", null));
        Observable obs = jsonToServer(url, null, "GET", pref.getString("token", null));
        obs.subscribe(a->{

            if(a.equals("FAIL")){
                return;
            }

            JSONArray array = new JSONObject(a.toString()).getJSONArray("list");
            infoCount.setText("총" + array.length() + "건의 예약일정이 있습니다");
            if(array.length() <= 0){
                builder.setTitle("정보").setMessage("예약일정이 없습니다").create().show();
                return;
            }

            for(int i = 0; i < array.length(); i++){
                JSONObject item = array.getJSONObject(i);
                Panel p = new Panel(getApplicationContext(),
                        item.getString("scheduleNo"),
                        item.getString("airlineName"),
                        item.getString("arrAirportId"),
                        item.getString("depAirportId"),
                        item.getString("arrPlandTime"),
                        item.getString("depPlandTime"),
                        item.getString("vihicleId"));
                scrollFrame.addView(p);
            }
        });
    }
    void data(){
        infoCount = findViewById(R.id.infoCount);
        scrollFrame = findViewById(R.id.scrollFrame);
        builder = new AlertDialog.Builder(ScheduleListActivity.this);
    }
    class Panel extends LinearLayout implements tools{
        String scheduleNo;
        String airlineNm;
        String arrAirportNm;
        String depAirportNm;
        String arrPlandTime;
        String depPlandTime;
        String vihicleId;

        public Panel(Context context, String scheduleNo, String airlineNm, String arrAirportNm, String depAirportNm, String arrPlandTime, String depPlandTime, String vihicleId){
            super(context);
            this.scheduleNo = scheduleNo;
            this.airlineNm = airlineNm;
            this.arrAirportNm = arrAirportNm;
            this.depAirportNm = depAirportNm;
            this.arrPlandTime = arrPlandTime;
            this.depPlandTime = depPlandTime;
            this.vihicleId = vihicleId;

            init(context);
            event();
        }
        void event(){
            setOnClickListener(a->{
                Intent intent = new Intent(getApplicationContext(), InfoActivity.class);
                intent.putExtra("scheduleNo", scheduleNo);
                startActivity(intent);
            });
        }
        void init(Context context){
            DisplayMetrics display = getResources().getDisplayMetrics();
            //기본 틀
            setOrientation(LinearLayout.VERTICAL);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins((int) dp(25, display), (int) dp(20, display), 0, 0); // set marginTop to 20 pixels
            setLayoutParams(params);
            setBackground(getResources().getDrawable(R.drawable.list_panelback));

            //항공 텍스트 뷰
            TextView airLine = new TextView(context);
            LayoutParams airLineMargin = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            airLineMargin.setMargins((int)dp(10, display), (int)dp(20, display), 0, 0);
            airLine.setLayoutParams(airLineMargin);
            airLine.setText(airlineNm);
            airLine.setTextSize(20);
            airLine.setTextColor(Color.parseColor("#000000"));
            addView(airLine);

            //옆으로 나열 레이아웃
            LinearLayout line = new LinearLayout(context);
            LayoutParams lineParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
            line.setOrientation(LinearLayout.HORIZONTAL);
            line.setLayoutParams(lineParams);
            addView(line);

            //번호 텍스트 뷰
            TextView vihicleId = new TextView(context);
            LayoutParams vihicleIdMargin = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);//여기 부터 해야함
            vihicleIdMargin.setMargins((int)dp(10, display), 0, 0, 0);
            vihicleId.setLayoutParams(vihicleIdMargin);
            vihicleId.setText(this.vihicleId);
            vihicleId.setTextSize(15);
            vihicleId.setTextColor(Color.parseColor("#787373"));
            line.addView(vihicleId);

            //출발시간
            TextView depTime = new TextView(context);
            LayoutParams depTimeMargins = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            depTimeMargins.setMargins((int) dp(10, display), 0, 0, 0);
            depTime.setLayoutParams(depTimeMargins);
            depTime.setTextSize(10);
            depTime.setTextColor(Color.parseColor("#000000"));
            depTime.setText(this.depPlandTime);
            line.addView(depTime);

            //비행기 이미지
            TextView image = new TextView(context);
            LayoutParams imageMargins = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            imageMargins.setMargins((int) dp(10, display), 0, 0, (int)dp(10, display));
            image.setLayoutParams(imageMargins);
            image.setBackground(getResources().getDrawable(R.drawable.list_airplane));
            line.addView(image);

            //도착 시간
            TextView arrTime = new TextView(context);
            LayoutParams arrTimeMargins = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            arrTimeMargins.setMargins((int) dp(20, display), 0, 0, 0);
            arrTime.setLayoutParams(depTimeMargins);
            arrTime.setTextSize(10);
            arrTime.setTextColor(Color.parseColor("#000000"));
            arrTime.setText(this.arrPlandTime);
            line.addView(arrTime);

        }
    }
}