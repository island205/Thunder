package com.dianping.hackathon.thunder.shop;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;

public class MainActivity extends DroidGap{

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("http://tech-l-cunzhi.dianpingoa.com:3000/shop");
    }
}