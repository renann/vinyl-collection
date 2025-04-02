package com.vinylapp.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.vinylapp.ui.screens.collection.CollectionScreen
import com.vinylapp.ui.screens.details.VinylDetailsScreen
import com.vinylapp.ui.screens.search.SearchScreen

sealed class Screen(val route: String) {
    object Collection : Screen("collection")
    object Search : Screen("search")
    object Details : Screen("details/{vinylId}") {
        fun createRoute(vinylId: String) = "details/$vinylId"
    }
}

@Composable
fun NavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Collection.route
    ) {
        composable(Screen.Collection.route) {
            CollectionScreen(
                onVinylClick = { vinylId ->
                    navController.navigate(Screen.Details.createRoute(vinylId))
                },
                onSearchClick = {
                    navController.navigate(Screen.Search.route)
                }
            )
        }

        composable(Screen.Search.route) {
            SearchScreen(
                onVinylClick = { vinylId ->
                    navController.navigate(Screen.Details.createRoute(vinylId))
                },
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }

        composable(
            route = Screen.Details.route,
            arguments = listOf(
                androidx.navigation.navArgument("vinylId") {
                    type = androidx.navigation.NavType.StringType
                    required = true
                }
            )
        ) {
            VinylDetailsScreen(
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }
    }
} 