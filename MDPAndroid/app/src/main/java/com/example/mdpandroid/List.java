package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;

import io.reactivex.rxjava3.core.Observable;

public class List extends AppCompatActivity implements JsonDataToServer {

    String[] info = new String[4];
    TextView countTxt;
    LinearLayout frame;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        for(int i = 0; i < info.length; i++){
            info[i] = getIntent().getStringExtra("start,end,airLine,date".split(",")[i]);
            System.out.println(info[i] + ", i : " + i);
        }
        loadData();
        loadAPI();
    }
    void loadData(){
        countTxt = findViewById(R.id.count);
        frame = findViewById(R.id.frame);
    }
    void loadAPI(){

        try {
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7lRppNnHg01uoL8pDhfJF3DAp8WVBgw0KGy01sVLzOaf0hgWe4ALjmk8NgWlQpYFaJcuNuXfLIHhVxP6oNpb%2BA%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*데이터 타입(xml, json)*/
            urlBuilder.append("&" + URLEncoder.encode("depAirportId","UTF-8") + "=" + URLEncoder.encode(info[0], "UTF-8")); /*출발공항ID*/
            urlBuilder.append("&" + URLEncoder.encode("arrAirportId","UTF-8") + "=" + URLEncoder.encode(info[1], "UTF-8")); /*도착공항ID*/
            urlBuilder.append("&" + URLEncoder.encode("depPlandTime","UTF-8") + "=" + URLEncoder.encode(info[3], "UTF-8")); /*출발일(YYYYMMDD)*/
            if(!info[3].equals("")){
                urlBuilder.append("&" + URLEncoder.encode("airlineId","UTF-8") + "=" + URLEncoder.encode(info[2], "UTF-8")); /*항공사ID*/
            }

            Observable obs = jsonToServer(urlBuilder.toString(), null, "GET");
            obs.subscribe(a->{
                JSONObject jsonObject = new JSONObject(a.toString()).getJSONObject("response");
                countTxt.setText("총 " + jsonObject.getJSONObject("body").getString("totalCount") + "건의 검색");
                JSONArray jsonArray = jsonObject.getJSONObject("body").getJSONObject("items").getJSONArray("item");
                for(int i = 0; i < jsonArray.length(); i++){
                    JSONObject item = jsonArray.getJSONObject(i);
                    Panel p = new Panel(getApplicationContext(),
                            item.getString("airlineNm"),
                            item.getString("arrAirportNm"),
                            item.getString("depAirportNm"),
                            item.getString("arrPlandTime"),
                            item.getString("depPlandTime"),
                            item.getString("vihicleId"));
                }
            });
        }catch (Exception e){

        }
    }
    class Panel extends LinearLayout{
        String airlineNm;
        String arrAirportNm;
        String depAirportNm;
        String arrPlandTime;
        String depPlandTime;
        String vihicleId;

        public Panel(Context context, String airlineNm, String arrAirportNm, String depAirportNm, String arrPlandTime, String depPlandTime, String vihicleId){
            super(context);
            this.airlineNm = airlineNm;
            this.arrAirportNm = arrAirportNm;
            this.depAirportNm = depAirportNm;
            this.arrPlandTime = arrPlandTime;
            this.depPlandTime = depPlandTime;
            this.vihicleId = vihicleId;

            init(context);
        }

        void init(Context context){
            //기본 틀
            setOrientation(LinearLayout.VERTICAL);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(25, 20, 0, 0); // set marginTop to 20 pixels
            setLayoutParams(params);
            setBackground(getResources().getDrawable(R.drawable.list_panelback));

            //항공 텍스트 뷰
            TextView airLine = new TextView(context);
            LayoutParams airLineMargin = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            airLineMargin.setMargins(20, 20, 0, 0);
            airLine.setLayoutParams(airLineMargin);
            airLine.setText(airlineNm);
            airLine.setTextSize(20);
            airLine.setTextColor(Color.parseColor("#000000"));

            //옆으로 나열 레이아웃
            LinearLayout line = new LinearLayout(context);
            LayoutParams lineParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
            line.setOrientation(LinearLayout.HORIZONTAL);
            line.setLayoutParams(lineParams);
            
            //번호 텍스트 뷰
            TextView vihicleId = new TextView(context);
            LayoutParams vihicleIdMargin = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);//여기 부터 해야함
            airLineMargin.setMargins(20, 20, 0, 0);
            airLine.setLayoutParams(airLineMargin);
            airLine.setText(this.vihicleId);
            airLine.setTextSize(20);
            airLine.setTextColor(Color.parseColor("#000000"));

        }

    }
}