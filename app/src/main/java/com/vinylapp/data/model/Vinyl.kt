package com.vinylapp.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "vinyls")
data class Vinyl(
    @PrimaryKey
    val id: String,
    val title: String,
    val artist: String,
    val year: Int,
    val genre: String,
    val label: String,
    val coverUrl: String,
    val tracklist: List<String>,
    val notes: String = ""
) 