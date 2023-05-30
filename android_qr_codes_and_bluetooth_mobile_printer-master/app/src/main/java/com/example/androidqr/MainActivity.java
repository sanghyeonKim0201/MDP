package com.example.androidqr;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.journeyapps.barcodescanner.BarcodeEncoder;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    Button createQR,scanQR,printLogo,bonus;
    TextInputEditText in_;
    TextInputLayout input;
    EditText printerID;

    PrintBluetooth printBT = new PrintBluetooth();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            requestPermissions(
                    new String[]{
                            Manifest.permission.BLUETOOTH,
                            Manifest.permission.BLUETOOTH_SCAN,
                            Manifest.permission.BLUETOOTH_ADVERTISE,
                            Manifest.permission.BLUETOOTH_CONNECT


                    },
                    1);
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(
                    new String[]{
                            Manifest.permission.BLUETOOTH

                    },
                    1);
        }

        createQR = findViewById(R.id.create_qr);
        scanQR = findViewById(R.id.scan_qr);
        printLogo = findViewById(R.id.print_logo);
        bonus = findViewById(R.id.bonus);
        printerID = findViewById(R.id.printer_id);

        createQR.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,CreateQRActivity.class);
                startActivity(intent);
            }
        });

        scanQR.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,ScanQRActivity.class);
                startActivity(intent);
            }
        });

        bonus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,BonusActivity.class);
                startActivity(intent);
            }
        });
        printLogo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                PrintBluetooth.printer_id = printerID.getText().toString();
                Bitmap bm = BitmapFactory.decodeResource(getResources(),R.drawable.logo_zainsoft);
                try {
                    printBT.findBT();
                    printBT.openBT();
                    printBT.printQrCode(bm);
                    printBT.closeBT();
                }catch (Exception ex){ex.printStackTrace();}
            }
        });


    }

}