package com.vinylapp.ui.screens.collection

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.vinylapp.R
import com.vinylapp.ui.components.VinylCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CollectionScreen(
    onVinylClick: (String) -> Unit,
    onSearchClick: () -> Unit,
    viewModel: CollectionViewModel = hiltViewModel()
) {
    val vinyls by viewModel.vinyls.collectAsState(initial = emptyList())
    val genres by viewModel.genres.collectAsState(initial = emptyList())
    var selectedGenre by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.collection_title)) },
                actions = {
                    IconButton(onClick = onSearchClick) {
                        Icon(Icons.Default.Add, contentDescription = stringResource(R.string.add_vinyl))
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            if (genres.isNotEmpty()) {
                ScrollableRow(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp)
                ) {
                    FilterChip(
                        selected = selectedGenre == null,
                        onClick = { selectedGenre = null },
                        label = { Text("All") }
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    genres.forEach { genre ->
                        FilterChip(
                            selected = selectedGenre == genre,
                            onClick = { selectedGenre = genre },
                            label = { Text(genre) }
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                    }
                }
            }

            if (vinyls.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(stringResource(R.string.no_vinyls))
                }
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Adaptive(minSize = 160.dp),
                    contentPadding = PaddingValues(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    items(
                        vinyls.filter { selectedGenre == null || it.genre == selectedGenre }
                    ) { vinyl ->
                        VinylCard(
                            vinyl = vinyl,
                            onClick = { onVinylClick(vinyl.id) }
                        )
                    }
                }
            }
        }
    }
} 