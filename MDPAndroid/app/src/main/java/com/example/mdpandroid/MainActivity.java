package com.example.mdpandroid;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;
import java.time.LocalDate;
import java.util.HashMap;

import io.reactivex.rxjava3.core.Observable;

public class MainActivity extends AppCompatActivity implements tools {

    TextView searchBtn;
    Spinner com[] = new Spinner[3];
    String[] comKey = new String[3];
    EditText txt[] = new EditText[3];
    HashMap<String, String>airLine = new HashMap<>();
    HashMap<String, String>airPlane = new HashMap<>();
    CheckBox chk;
    AlertDialog.Builder builder;
    String date;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        data();
        loadAirLine();
        loadAirPlane();
        chk.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if(isChecked){
                    com[2].setEnabled(false);
                    comKey[2] = "";
                }else{
                    com[2].setEnabled(true);
                }
            }
        });

        for(Spinner c : com){
            c.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    if(c.getId() == R.id.startCom){
                        String[] str = airPlane.entrySet().stream().filter(a->a.getValue().indexOf(parent.getSelectedItem().toString()) == -1).map(a->a.getValue()).toArray(String[]::new);
                        ArrayAdapter adapter = new ArrayAdapter(MainActivity.this, android.R.layout.simple_spinner_item, str);
                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        com[1].setAdapter(adapter);
                        comKey[0] = airPlane.entrySet().stream().filter(a->a.getValue().indexOf(parent.getSelectedItem().toString()) != -1).map(a->a.getKey().toString()).findAny().get().toString();
                    }else if(c.getId() == R.id.airLineCom){
                        comKey[2] = airLine.entrySet().stream().filter(a->a.getValue().indexOf(parent.getSelectedItem().toString()) != -1).map(a->a.getKey().toString()).findAny().get().toString();
                    }else{
                        comKey[1] = airPlane.entrySet().stream().filter(a->a.getValue().indexOf(parent.getSelectedItem().toString()) != -1).map(a->a.getKey().toString()).findAny().get().toString();
                    }
                }
                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });
        }

        searchBtn.setOnClickListener(a->{
            for(EditText t : txt){
                if(t.getText().toString().equals("")){
                    builder.setTitle("경고").setMessage("예약 일자를 선택해주세요").create().show();
                    return;
                }
            }
            try {
                int txt1 = Integer.parseInt(txt[0].getText().toString());
                int txt2 = Integer.parseInt(txt[1].getText().toString());
                int txt3 = Integer.parseInt(txt[2].getText().toString());

                LocalDate localDate = LocalDate.parse(String.format("%04d-%02d-%02d", txt1, txt2, txt3));
                if(LocalDate.now().toEpochDay() > localDate.toEpochDay()){
                    builder.setTitle("경고").setMessage("이미 지난 날은 예약 불가 합니다").create().show();
                    return;
                }
                date = String.format("%04d%02d%02d", txt1, txt2, txt3);
            }catch (Exception e){
                e.printStackTrace();
                builder.setTitle("경고").setMessage("날짜가 형식이 올바 르지 않습니다 (yyyyMMdd)").create().show();
                return;
            }

            Intent intent = new Intent(getApplicationContext(), List.class);
            intent.putExtra("start", comKey[0]);
            intent.putExtra("end", comKey[1]);
            intent.putExtra("airLine", comKey[2]);
            intent.putExtra("date", date);

            startActivity(intent);
        });
    }
    void data(){
        for(int i = 0; i < txt.length; i++){
            txt[i] = findViewById(new int[]{R.id.yearTxt, R.id.monthTxt, R.id.dayTxt}[i]);
        }
        for(int i = 0; i < com.length; i++){
            com[i] = findViewById(new int[]{R.id.startCom, R.id.arrCom, R.id.airLineCom}[i]);
        }
        searchBtn = findViewById(R.id.searchTxt);
        chk = findViewById(R.id.selectChk);
        builder = new AlertDialog.Builder(MainActivity.this);
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
                    airLine.put(item.getString("airlineId"), item.getString("airlineNm"));
                }
                ArrayAdapter<String> array = new ArrayAdapter<String>(MainActivity.this,
                        android.R.layout.simple_spinner_item,
                        airLine.entrySet().stream().map(a->
                                a.getValue()
                        ).toArray(String[]::new));
                array.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                com[2].setAdapter(array);
            });
        }catch (Exception e){

        }
    }
}