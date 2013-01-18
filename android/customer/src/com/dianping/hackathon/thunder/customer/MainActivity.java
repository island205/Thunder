package com.dianping.hackathon.thunder.customer;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;

public class MainActivity extends DroidGap{

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("http://192.168.13.152:3000/");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    
}
