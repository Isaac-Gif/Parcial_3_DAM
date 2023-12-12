// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn build_application_menu() -> Menu {
    return Menu::new()
        .add_submenu(Submenu::new(
            "resize-images",
            Menu::new()
                .add_item(CustomMenuItem::new("acerca".to_string(), "Acerca"))
        ))
        .add_submenu(Submenu::new(
            "Developer",
            Menu::new()
                .add_item(CustomMenuItem::new("reload".to_string(), "Reload").accelerator("Ctrl+R"))
                .add_item(CustomMenuItem::new("force_reload".to_string(), "Force Reload").accelerator("Ctrl+Shift+R"))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("toggle_developer_tools".to_string(), "Toggle Developer Tools").accelerator("CmdOrCtrl+Shift+I")),
        ));
}


fn main() {
    tauri::Builder::default()
        .menu(build_application_menu())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
