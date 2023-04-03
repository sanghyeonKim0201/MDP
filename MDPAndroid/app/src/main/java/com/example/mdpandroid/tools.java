package com.example.mdpandroid;


import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.util.TypedValue;

import org.json.JSONObject;

import java.io.BufferedReader;

import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.schedulers.Schedulers;


public interface tools {

    default Observable jsonToServer(String urlStr, JSONObject jsonObject, String method, String header){
        return Observable.fromCallable(()->{
            URL url = new URL(urlStr);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();

            con.setUseCaches(false);
            con.setRequestProperty("Accept-Charset", "UTF-8"); //header 설정
            con.setRequestProperty("Content-type", "application/json"); //header 설정
            if(header != null){//토큰이 있는 경우 토큰 설정
                con.setRequestProperty("Authorization", "Bearer "+header);
            }
            con.setRequestMethod(method); //메소드 설정
            con.setDoInput(true);

            if(jsonObject != null){ //서버에 보낼 json이 있는 경우
                con.setDoOutput(true);
                String json = jsonObject.toString();
                OutputStream os = con.getOutputStream();
                os.write(json.getBytes("utf-8"));
                os.flush();
            }
            BufferedReader rd;
            if (con.getResponseCode() >= 200 && con.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                return "FAIL";
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            con.disconnect();
            return sb.toString();
        }).subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()); //서브 스레드에서 http통신을 하고 그 이후 메인 쓰레드에서 실행
    }
    default float size(int type, int value, DisplayMetrics display){
        return TypedValue.applyDimension(type, value, display);
    }
    default float dp(int value, DisplayMetrics display){
        return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, display);
    }
    default String getKeyHash(final Context context){
        PackageManager pm = context.getPackageManager();
        try{
            PackageInfo packageInfo = pm.getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
            if(packageInfo == null){
                return null;
            }

            for(Signature signature  :packageInfo.signatures){
                try{
                    MessageDigest md = MessageDigest.getInstance("SHA");
                    md.update(signature.toByteArray());
                    return android.util.Base64.encodeToString(md.digest(), Base64.NO_WRAP);
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
