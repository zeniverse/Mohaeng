package com.mohaeng.backend.place.exception;

public class PlaceNotFoundException extends RuntimeException {
    public PlaceNotFoundException() {
        super("Place not found");
    }
}
