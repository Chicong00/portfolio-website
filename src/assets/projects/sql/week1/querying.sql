-- 1. What is the total amount each customer spent at the restaurant?

select 
	s.customer_id,
  sum(m.price) as total_amount
from dannys_diner.sales as s 
join dannys_diner.menu as m
on s.product_id = m.product_id
group by s.customer_id
order by 2 desc;

-- 2. How many days has each customer visited the restaurant?

select 
	s.customer_id,
	count(distinct order_date) as visit_count
from dannys_diner.sales as s
group by s.customer_id;

-- 3. What was the first item from the menu purchased by each customer?

select 
  distinct customer_id, product_name 
from
( select
	  customer_id,
	  product_name,
    order_date,
    rank() over (partition by customer_id order by order_date asc) as rank
  from dannys_diner.sales as s
  join dannys_diner.menu as m 
  on s.product_id = m.product_id) as temp
where temp.rank = 1;


-- 4. What is the most purchased item on the menu and how many times was it purchased by all customers?

SELECT product_name, purchased_count
from
( SELECT
      (count(s.product_id)) purchased_count,
      product_name,
      dense_rank() over (order by count(s.product_id) desc) rank
  from dannys_diner.sales s 
  join dannys_diner.menu m 
  on s.product_id = m.product_id
  GROUP by product_name, s.product_id
  ORDER BY purchased_count DESC) temp
  where rank = 1; 

-- 5. Which item was the most popular for each customer?

select customer_id, product_name, amount_purchased as most_purchased
from 
( SELECT
      customer_id,
      product_name,
      count(s.product_id) amount_purchased,
      dense_rank() over (partition by customer_id order by count(s.product_id) desc ) rank 
  from dannys_diner.sales s 
  JOIN dannys_diner.menu m 
  on s.product_id = m.product_id
  GROUP by customer_id, product_name, s.product_id) temp 
where rank =1 
order by most_purchased DESC;

-- 6. Which item was purchased first by the customer after they became a member?

select customer_id, product_name, order_date
from 
( select
      s.customer_id, order_date, product_id,
      DENSE_RANK() over (PARTITION by s.customer_id order by order_date asc) rank 
  from dannys_diner.members m1 
  join dannys_diner.sales s 
  on m1.customer_id = s.customer_id
  WHERE order_date >= join_date) temp 
join dannys_diner.menu m2
on temp.product_id = m2.product_id
WHERE temp.rank = 1
order by 3 asc;

-- 7. Which item was purchased just before the customer became a member?

select customer_id, product_name, order_date
from 
( select
      s.customer_id, order_date, product_id,
      DENSE_RANK() over (PARTITION by s.customer_id order by order_date desc) rank 
  from dannys_diner.members m1 
  join dannys_diner.sales s 
  on m1.customer_id = s.customer_id
  WHERE order_date < join_date) temp 
join dannys_diner.menu m2
on temp.product_id = m2.product_id
WHERE temp.rank = 1
order by 3;

-- 8. What is the total items and amount spent for each member before they became a member?

SELECT
    s.customer_id,
    count(distinct s.product_id) total_unique_items,
    SUM(m2.price) total_amount 
from dannys_diner.members m1
JOIN dannys_diner.sales s 
on m1.customer_id = s.customer_id
JOIN dannys_diner.menu m2
on m2.product_id = s.product_id
where s.order_date < m1.join_date
GROUP by s.customer_id;

-- 9.  If each $1 spent equates to 10 points and sushi has a 2x points multiplier - how many points would each customer have?

WITH cte AS
(
  select 
    customer_id, product_name,
    m.price,
    case 
    when product_name = 'sushi' then m.price*20 
    else m.price*10
    end as points
  from dannys_diner.sales s 
  join dannys_diner.menu m 
  on s.product_id = m.product_id
)
SELECT 
  customer_id, 
  sum(p.points) total_points
from cte as p 
GROUP by customer_id
ORDER BY 2 desc;

-- 10. In the first week after a customer joins the program (including their join date) 
--they earn 2x points on all items, not just sushi - how many points do customer A and B have at the end of January?

select customer_id, sum(points) total_points
from (
select customer_id,day_count,
  case 
    when day_count >=0 and day_count <7 then m2.price*20
    when product_name ='sushi' then m2.price*20
    else m2.price *10
    end as points 
from  (select 
  s.customer_id,product_id, join_date, order_date,
  (order_date - join_date) AS day_count
from dannys_diner.sales s 
join dannys_diner.members m1 
on s.customer_id = m1.customer_id) p_
join dannys_diner.menu m2
on p_.product_id  = m2.product_id
where order_date < '2021-01-31'
) p
GROUP by customer_id;
