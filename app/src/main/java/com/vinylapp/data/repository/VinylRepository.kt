package com.vinylapp.data.repository

import com.vinylapp.data.local.VinylDao
import com.vinylapp.data.model.Vinyl
import com.vinylapp.data.remote.DiscogsApi
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class VinylRepository @Inject constructor(
    private val vinylDao: VinylDao,
    private val discogsApi: DiscogsApi
) {
    fun getAllVinyls(): Flow<List<Vinyl>> = vinylDao.getAllVinyls()

    fun getVinylsByGenre(genre: String): Flow<List<Vinyl>> = vinylDao.getVinylsByGenre(genre)

    fun getAllGenres(): Flow<List<String>> = vinylDao.getAllGenres()

    suspend fun getVinylById(id: String): Vinyl? = vinylDao.getVinylById(id)

    suspend fun insertVinyl(vinyl: Vinyl) = vinylDao.insertVinyl(vinyl)

    suspend fun updateVinyl(vinyl: Vinyl) = vinylDao.updateVinyl(vinyl)

    suspend fun deleteVinyl(vinyl: Vinyl) = vinylDao.deleteVinyl(vinyl)

    suspend fun fetchVinylFromDiscogs(id: String, token: String): Vinyl? {
        return try {
            val response = discogsApi.getRelease(id, token)
            Vinyl(
                id = response.id,
                title = response.title,
                artist = response.artist,
                year = response.year,
                genre = response.genre.firstOrNull() ?: "Unknown",
                label = response.label.firstOrNull() ?: "Unknown",
                coverUrl = response.images.firstOrNull()?.uri ?: "",
                tracklist = response.tracklist.map { "${it.position}. ${it.title}" }
            )
        } catch (e: Exception) {
            null
        }
    }
} 