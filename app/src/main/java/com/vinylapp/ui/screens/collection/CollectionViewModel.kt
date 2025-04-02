package com.vinylapp.ui.screens.collection

import androidx.lifecycle.ViewModel
import com.vinylapp.data.repository.VinylRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

@HiltViewModel
class CollectionViewModel @Inject constructor(
    private val repository: VinylRepository
) : ViewModel() {
    val vinyls: Flow<List<Vinyl>> = repository.getAllVinyls()
    val genres: Flow<List<String>> = repository.getAllGenres()
} 