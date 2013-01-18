package com.dianping.hackathon.thunder.customer;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;

public class MainActivity extends DroidGap{

    @Override
    public void onCreate(Bundle savedInstanceState) {
    	String server = getString(R.string.sever);
        super.onCreate(savedInstanceState);
        super.loadUrl("http://" + server + ":3000/customer");
    }
}
