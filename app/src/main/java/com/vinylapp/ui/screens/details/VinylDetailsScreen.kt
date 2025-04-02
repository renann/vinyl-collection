package com.vinylapp.ui.screens.details

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavBackStackEntry
import androidx.navigation.compose.currentBackStackEntryAsState
import coil.compose.AsyncImage
import com.vinylapp.R
import com.vinylapp.ui.components.VinylCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VinylDetailsScreen(
    onBackClick: () -> Unit,
    viewModel: VinylDetailsViewModel = hiltViewModel()
) {
    val backStackEntry = currentBackStackEntryAsState()
    val vinylId = backStackEntry.value?.arguments?.getString("vinylId")
    
    LaunchedEffect(vinylId) {
        vinylId?.let { viewModel.loadVinyl(it) }
    }

    val vinyl by viewModel.vinyl.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()
    var notes by remember { mutableStateOf(vinyl?.notes ?: "") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(vinyl?.title ?: stringResource(R.string.details_title)) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.Default.ArrowBack, contentDescription = stringResource(R.string.back_button))
                    }
                },
                actions = {
                    vinyl?.let {
                        IconButton(
                            onClick = { viewModel.deleteVinyl(it) }
                        ) {
                            Icon(Icons.Default.Delete, contentDescription = stringResource(R.string.delete_button))
                        }
                    }
                }
            )
        }
    ) { padding ->
        when {
            isLoading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
            error != null -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = error ?: stringResource(R.string.error_loading),
                        color = MaterialTheme.colorScheme.error
                    )
                }
            }
            vinyl != null -> {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding)
                        .verticalScroll(rememberScrollState()),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    AsyncImage(
                        model = vinyl!!.coverUrl,
                        contentDescription = "${vinyl!!.artist} - ${vinyl!!.title}",
                        modifier = Modifier
                            .fillMaxWidth()
                            .aspectRatio(1f),
                        contentScale = ContentScale.Crop
                    )

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Text(
                            text = vinyl!!.title,
                            style = MaterialTheme.typography.headlineMedium
                        )
                        Text(
                            text = vinyl!!.artist,
                            style = MaterialTheme.typography.titleMedium
                        )
                        Text(
                            text = "${stringResource(R.string.year_label)}: ${vinyl!!.year}",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Text(
                            text = "${stringResource(R.string.genre_label)}: ${vinyl!!.genre}",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Text(
                            text = "${stringResource(R.string.label_label)}: ${vinyl!!.label}",
                            style = MaterialTheme.typography.bodyLarge
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Text(
                            text = stringResource(R.string.tracklist_label),
                            style = MaterialTheme.typography.titleMedium
                        )
                        vinyl!!.tracklist.forEach { track ->
                            Text(
                                text = track,
                                style = MaterialTheme.typography.bodyMedium
                            )
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        OutlinedTextField(
                            value = notes,
                            onValueChange = { notes = it },
                            label = { Text(stringResource(R.string.notes_label)) },
                            modifier = Modifier.fillMaxWidth(),
                            minLines = 3
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Button(
                            onClick = { viewModel.updateVinyl(vinyl!!.copy(notes = notes)) },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(stringResource(R.string.save_button))
                        }
                    }
                }
            }
        }
    }
} 