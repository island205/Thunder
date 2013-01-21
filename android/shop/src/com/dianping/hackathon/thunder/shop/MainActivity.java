package com.dianping.hackathon.thunder.shop;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;

public class MainActivity extends DroidGap{

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("http://192.168.32.50:3000/shop");
    }
}