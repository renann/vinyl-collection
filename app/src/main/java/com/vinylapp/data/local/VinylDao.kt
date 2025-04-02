package com.vinylapp.data.local

import androidx.room.*
import com.vinylapp.data.model.Vinyl
import kotlinx.coroutines.flow.Flow

@Dao
interface VinylDao {
    @Query("SELECT * FROM vinyls ORDER BY artist ASC, title ASC")
    fun getAllVinyls(): Flow<List<Vinyl>>

    @Query("SELECT * FROM vinyls WHERE genre = :genre ORDER BY artist ASC, title ASC")
    fun getVinylsByGenre(genre: String): Flow<List<Vinyl>>

    @Query("SELECT * FROM vinyls WHERE id = :id")
    suspend fun getVinylById(id: String): Vinyl?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertVinyl(vinyl: Vinyl)

    @Update
    suspend fun updateVinyl(vinyl: Vinyl)

    @Delete
    suspend fun deleteVinyl(vinyl: Vinyl)

    @Query("SELECT DISTINCT genre FROM vinyls ORDER BY genre ASC")
    fun getAllGenres(): Flow<List<String>>
} 