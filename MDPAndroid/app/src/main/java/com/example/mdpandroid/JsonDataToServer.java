package com.example.mdpandroid;

import android.app.Person;

import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

public interface JsonDataToServer {
    default String jsonToServer(String URL, JSONObject jsonObject, String method){
        try {
            URL url = new URL(URL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();

            String json = jsonObject.toString();

            con.setConnectTimeout(15000);
            con.setReadTimeout(5000);
            con.setRequestProperty("Accept-Charset", "UTF-8");
            con.setRequestProperty("Content-type", "application/json");
            con.setRequestMethod(method);

            switch (method){
                case "GET":con.setDoOutput(false);con.setDoInput(true);
                default:con.setDoOutput(true);con.setDoInput(true);
            }

            OutputStream os = con.getOutputStream();
            os.write(json.getBytes("utf-8"));
            os.flush();

        }catch (Exception e){

        }
        return  "";
    }
}
