package com.example.mdpandroid;

import android.app.Application;

import com.kakao.sdk.common.KakaoSdk;

public class kakaoApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        KakaoSdk.init(this, "9c04a28fd75857aa923a67fa56b03868");
    }
}
