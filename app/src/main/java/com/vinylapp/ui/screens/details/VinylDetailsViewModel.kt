package com.vinylapp.ui.screens.details

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
class VinylDetailsViewModel @Inject constructor(
    private val repository: VinylRepository
) : ViewModel() {

    private val _vinyl = MutableStateFlow<Vinyl?>(null)
    val vinyl: StateFlow<Vinyl?> = _vinyl.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun loadVinyl(id: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val vinyl = repository.getVinylById(id)
                if (vinyl != null) {
                    _vinyl.value = vinyl
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

    fun updateVinyl(vinyl: Vinyl) {
        viewModelScope.launch {
            try {
                repository.updateVinyl(vinyl)
                _vinyl.value = vinyl
            } catch (e: Exception) {
                _error.value = e.message ?: "Failed to update vinyl"
            }
        }
    }

    fun deleteVinyl(vinyl: Vinyl) {
        viewModelScope.launch {
            try {
                repository.deleteVinyl(vinyl)
                _vinyl.value = null
            } catch (e: Exception) {
                _error.value = e.message ?: "Failed to delete vinyl"
            }
        }
    }
} 