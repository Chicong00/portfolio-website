-- Customer Churn Data Analysis
-- SQL queries for customer churn prediction model

-- Initial data exploration
SELECT COUNT(*) as total_customers,
       SUM(churn) as churned_customers,
       ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data;

-- Churn rate by demographic factors
SELECT 
    gender,
    age_group,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data
GROUP BY gender, age_group
ORDER BY churn_rate DESC;

-- Churn rate by subscription type
SELECT 
    subscription_type,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate,
    AVG(monthly_charges) as avg_monthly_charges
FROM customer_data
GROUP BY subscription_type
ORDER BY churn_rate DESC;

-- Usage patterns analysis
SELECT 
    CASE 
        WHEN monthly_usage < 10 THEN 'Low Usage'
        WHEN monthly_usage BETWEEN 10 AND 50 THEN 'Medium Usage'
        ELSE 'High Usage'
    END as usage_category,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data
GROUP BY usage_category
ORDER BY churn_rate DESC;

-- Payment history impact
SELECT 
    payment_method,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate,
    AVG(late_payment_count) as avg_late_payments
FROM customer_data
GROUP BY payment_method
ORDER BY churn_rate DESC;

-- Support ticket analysis
SELECT 
    CASE 
        WHEN support_tickets_monthly = 0 THEN 'No Tickets'
        WHEN support_tickets_monthly BETWEEN 1 AND 3 THEN 'Low Support'
        WHEN support_tickets_monthly BETWEEN 4 AND 7 THEN 'Medium Support'
        ELSE 'High Support'
    END as support_category,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data
GROUP BY support_category
ORDER BY churn_rate DESC;

-- Customer tenure analysis
SELECT 
    CASE 
        WHEN customer_tenure < 6 THEN 'New (< 6 months)'
        WHEN customer_tenure BETWEEN 6 AND 24 THEN 'Established (6-24 months)'
        ELSE 'Long-term (> 24 months)'
    END as tenure_category,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data
GROUP BY tenure_category
ORDER BY churn_rate DESC;

-- Feature adoption analysis
SELECT 
    feature_adoption_rate,
    COUNT(*) as total_customers,
    SUM(churn) as churned_customers,
    ROUND(SUM(churn) * 100.0 / COUNT(*), 2) as churn_rate
FROM customer_data
GROUP BY feature_adoption_rate
ORDER BY feature_adoption_rate DESC;

-- High-risk customer identification
SELECT 
    customer_id,
    age_group,
    subscription_type,
    monthly_charges,
    support_tickets_monthly,
    late_payment_count,
    feature_adoption_rate,
    churn
FROM customer_data
WHERE support_tickets_monthly > 3 
   OR late_payment_count > 2
   OR feature_adoption_rate < 0.3
ORDER BY churn DESC, support_tickets_monthly DESC
LIMIT 20;

-- Retention opportunity analysis
SELECT 
    customer_id,
    age_group,
    subscription_type,
    monthly_charges,
    customer_tenure,
    churn,
    CASE 
        WHEN churn = 1 AND customer_tenure > 12 THEN 'High Value At Risk'
        WHEN churn = 1 AND monthly_charges > 100 THEN 'High Revenue At Risk'
        WHEN churn = 0 AND support_tickets_monthly > 2 THEN 'Proactive Intervention'
        ELSE 'Stable Customer'
    END as customer_segment
FROM customer_data
WHERE churn = 1 OR support_tickets_monthly > 2
ORDER BY monthly_charges DESC
LIMIT 50;
