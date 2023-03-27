package com.mohaeng.backend.place.exception;

public class PlaceNotFoundException extends RuntimeException {
    public PlaceNotFoundException(String message) {
        super("Place not found: " + message);
    }
}
