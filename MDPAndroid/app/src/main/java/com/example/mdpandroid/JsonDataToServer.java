package com.example.mdpandroid;


import androidx.appcompat.app.AlertDialog;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import kotlin.reflect.KClass;


public interface JsonDataToServer {

    default JSONObject jsonToServer(String URL, JSONObject jsonObject, String method){
        InputStream is = null;
        BufferedReader reader = null;
        try {
            URL url = new URL(URL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
//            con.connect();

            String json = jsonObject.toString();

            con.setConnectTimeout(15000);
            con.setReadTimeout(5000);
            con.setUseCaches(false);
            con.setRequestProperty("Accept-Charset", "UTF-8");
            con.setRequestProperty("Content-type", "application/json");
            con.setRequestMethod(method);

            switch (method){
                case "GET":con.setDoOutput(false);con.setDoInput(true);
                default:con.setDoOutput(true);con.setDoInput(true);
            }

            if(jsonObject != null){
                OutputStream os = con.getOutputStream();
                os.write(json.getBytes("utf-8"));
                os.flush();
                os.close();
            }


            try{
                is = con.getInputStream();
                if(is != null){
                    StringBuilder builder = new StringBuilder();
                    reader = new BufferedReader(new InputStreamReader(is));
                    String line;
                    while((line = reader.readLine()) != null){
                        builder.append(line);
                    }
                    reader.close();

                    return new JSONObject(builder.toString());
                }else{
                    return null;
                }
            }catch (Exception e){
                e.printStackTrace();
                return null;
            }

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
