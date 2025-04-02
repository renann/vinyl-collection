package com.vinylapp.data.remote

import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface DiscogsApi {
    @GET("releases/{id}")
    suspend fun getRelease(
        @Path("id") id: String,
        @Header("Authorization") token: String
    ): DiscogsResponse
}

data class DiscogsResponse(
    val id: String,
    val title: String,
    val artist: String,
    val year: Int,
    val genre: List<String>,
    val label: List<String>,
    val tracklist: List<Track>,
    val images: List<Image>
)

data class Track(
    val position: String,
    val title: String
)

data class Image(
    val uri: String,
    val height: Int,
    val width: Int
) 