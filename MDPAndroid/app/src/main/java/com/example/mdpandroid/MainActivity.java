package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;
import java.util.HashMap;

import io.reactivex.rxjava3.core.Observable;

public class MainActivity extends AppCompatActivity implements JsonDataToServer{

    Button searchBtn;
    Spinner com[] = new Spinner[2];
    EditText txt[] = new EditText[3];
    HashMap<String, String>airLine = new HashMap<>();
    HashMap<String, String>airPlane = new HashMap<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        data();
        loadAirLine();
        loadAirPlane();
    }
    void data(){
        for(int i = 0; i < txt.length; i++){
            txt[i] = findViewById(new int[]{R.id.yearTxt, R.id.monthTxt, R.id.dayTxt}[i]);
        }
        for(int i = 0; i < com.length; i++){
            com[i] = findViewById(new int[]{R.id.startCom, R.id.arrCom}[i]);
            com[i].setPrompt("출발지를 선택하세요, 도착지를 선택하세요".split(",")[i]);
        }
        searchBtn = findViewById(R.id.searchBtn);
    }
    void loadAirPlane(){
        try {
            StringBuilder urlBuilder = new StringBuilder(
                    "http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList"); /* URL */
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=7lRppNnHg01uoL8pDhfJF3DAp8WVBgw0KGy01sVLzOaf0hgWe4ALjmk8NgWlQpYFaJcuNuXfLIHhVxP6oNpb%2BA%3D%3D"); /* Service Key */
            urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "="
                    + URLEncoder.encode("json", "UTF-8")); /* 데이터 타입(xml, json) */

            Observable jsonStr = jsonToServer(urlBuilder.toString(), null, "GET");
            jsonStr.subscribe(r->{
                JSONObject jsonObject = new JSONObject(r.toString());
                JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
                for(int i =0; i <  jsonArray.length(); i++){
                    JSONObject item = jsonArray.getJSONObject(i);
                    airPlane.put(item.getString("airportId"), item.getString("airportNm"));
                }
                ArrayAdapter<String> array = new ArrayAdapter<String>(MainActivity.this,
                        android.R.layout.simple_spinner_item,
                        airPlane.entrySet().stream().map(a->
                    a.getValue()
                ).toArray(String[]::new));
                array.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                com[0].setAdapter(array);
            });

        }catch (Exception e){
            e.printStackTrace();
        }
    }
    void loadAirLine(){
        try {
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList");
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7lRppNnHg01uoL8pDhfJF3DAp8WVBgw0KGy01sVLzOaf0hgWe4ALjmk8NgWlQpYFaJcuNuXfLIHhVxP6oNpb%2BA%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            Observable jsonStr = jsonToServer(urlBuilder.toString(), null, "GET");
            jsonStr.subscribe(r->{
                JSONObject jsonObject = new JSONObject(r.toString());
                JSONArray jsonArray = jsonObject.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
                for(int i =0; i <  jsonArray.length(); i++){
                    JSONObject item = jsonArray.getJSONObject(i);
                    airLine.put(item.getString("airlineNm"), item.getString("airlineNm"));
                }
                ArrayAdapter<String> array = new ArrayAdapter<String>(MainActivity.this,
                        android.R.layout.simple_spinner_item,
                        airLine.entrySet().stream().map(a->
                                a.getValue()
                        ).toArray(String[]::new));
                array.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                com[1].setAdapter(array);
            });
        }catch (Exception e){

        }
    }
}