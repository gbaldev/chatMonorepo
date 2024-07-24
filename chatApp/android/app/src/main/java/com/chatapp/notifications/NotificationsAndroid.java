package com.chatapp.notifications;
import androidx.core.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.app.PendingIntent;
import android.provider.Settings;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.chatapp.MainActivity;

public class NotificationsAndroid extends ReactContextBaseJavaModule {
    private static final int NOTIFICATION_PERMISSION_CODE = 100;
    private static final String CHANNEL_ID = "default_channel";
    private static final String CHANNEL_NAME = "Default Channel";
    private Promise mPermissionPromise;

    public NotificationsAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
        createNotificationChannel();
    }

    @Override
    public String getName() {
        return "NotificationsAndroid";
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH);
            NotificationManager notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @ReactMethod
    public void requestPermissions(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity is null");
            return;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (NotificationManagerCompat.from(currentActivity).areNotificationsEnabled()) {
                openNotificationSettings(currentActivity);
                mPermissionPromise = promise;
            } else if (ActivityCompat.checkSelfPermission(currentActivity, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                mPermissionPromise = promise;
                promise.resolve(true);
            } else if (!ActivityCompat.shouldShowRequestPermissionRationale(currentActivity, Manifest.permission.POST_NOTIFICATIONS)) {
                openNotificationSettings(currentActivity);
                mPermissionPromise = promise;
            } else {
                ActivityCompat.requestPermissions(currentActivity,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS},
                        NOTIFICATION_PERMISSION_CODE);
                mPermissionPromise = promise;
            }
        } else {
            promise.resolve(true);
        }
    }

    private void openNotificationSettings(Activity activity) {
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.setAction(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra(Settings.EXTRA_APP_PACKAGE, activity.getPackageName());
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            intent.putExtra("app_package", activity.getPackageName());
            intent.putExtra("app_uid", activity.getApplicationInfo().uid);
        } else {
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.addCategory(Intent.CATEGORY_DEFAULT);
            intent.setData(android.net.Uri.parse("package:" + activity.getPackageName()));
        }
        activity.startActivity(intent);
    }

    @ReactMethod
    public void checkPermissions(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity is null");
            return;
        }

        boolean areNotificationsEnabled = NotificationManagerCompat.from(currentActivity).areNotificationsEnabled();
        promise.resolve(areNotificationsEnabled);
    }

    @ReactMethod
    public void sendNotification(ReadableMap notification) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }

        String title = notification.getString("title");
        String body = notification.getString("body");

        Intent intent = new Intent(currentActivity, MainActivity.class);
        intent.setAction(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);

        PendingIntent pendingIntent;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            // For android 12 (API lvl 31) > we need to specify the inmutability of the pending intent
            pendingIntent = PendingIntent.getActivity(currentActivity, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        } else {
            pendingIntent = PendingIntent.getActivity(currentActivity, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(currentActivity, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_email) // Complex icons are not beign displayed properly in newest versions of Androiod
                .setContentTitle(title)
                .setContentText(body)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(currentActivity);
        notificationManager.notify(1, builder.build());
    }
}