package com.vinylapp.di

import android.content.Context
import androidx.room.Room
import com.vinylapp.data.local.VinylDatabase
import com.vinylapp.data.remote.DiscogsApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    
    @Provides
    @Singleton
    fun provideVinylDatabase(
        @ApplicationContext context: Context
    ): VinylDatabase {
        return Room.databaseBuilder(
            context,
            VinylDatabase::class.java,
            "vinyl_database"
        ).build()
    }

    @Provides
    @Singleton
    fun provideVinylDao(database: VinylDatabase) = database.vinylDao()

    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            })
            .build()
    }

    @Provides
    @Singleton
    fun provideDiscogsApi(okHttpClient: OkHttpClient): DiscogsApi {
        return Retrofit.Builder()
            .baseUrl("https://api.discogs.com/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(DiscogsApi::class.java)
    }
} 