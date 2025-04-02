package com.vinylapp.ui.screens.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.vinylapp.data.model.Vinyl
import com.vinylapp.data.repository.VinylRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SearchViewModel @Inject constructor(
    private val repository: VinylRepository
) : ViewModel() {

    private val _searchResult = MutableStateFlow<Vinyl?>(null)
    val searchResult: StateFlow<Vinyl?> = _searchResult.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun searchVinyl(id: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val vinyl = repository.fetchVinylFromDiscogs(id, "TVarOneQHnuSmsZExlntKXpTJkXZgKsZkwSnXgAc")
                if (vinyl != null) {
                    _searchResult.value = vinyl
                } else {
                    _error.value = "Vinyl not found"
                }
            } catch (e: Exception) {
                _error.value = e.message ?: "Unknown error occurred"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun saveVinyl(vinyl: Vinyl) {
        viewModelScope.launch {
            try {
                repository.insertVinyl(vinyl)
                _searchResult.value = null
            } catch (e: Exception) {
                _error.value = e.message ?: "Failed to save vinyl"
            }
        }
    }
} 