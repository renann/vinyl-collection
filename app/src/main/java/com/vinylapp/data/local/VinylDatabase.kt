package com.vinylapp.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.vinylapp.data.model.Vinyl

@Database(entities = [Vinyl::class], version = 1)
@TypeConverters(Converters::class)
abstract class VinylDatabase : RoomDatabase() {
    abstract fun vinylDao(): VinylDao
}

@androidx.room.TypeConverters
class Converters {
    @androidx.room.TypeConverter
    fun fromString(value: String): List<String> {
        return value.split(",").map { it.trim() }
    }

    @androidx.room.TypeConverter
    fun toString(list: List<String>): String {
        return list.joinToString(",")
    }
} 