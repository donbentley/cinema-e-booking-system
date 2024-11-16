package com.csci4050.promotion.requests;

import lombok.Data;

@Data
public class PromotionRequest {
    private String event;
    private float discount; 
}
