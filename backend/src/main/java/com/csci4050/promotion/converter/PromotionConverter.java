package com.csci4050.promotion.converter;

import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.requests.PromotionRequest;

public class PromotionConverter {
    public static Promotion convert(PromotionRequest pr) {
        Promotion p = Promotion.builder()
            .event(pr.getEvent())
            .discount(pr.getDiscount())
            .active(false)
        .build();
        return p;
    }
}
