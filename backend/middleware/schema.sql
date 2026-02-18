create database restorentordermangement;
use restorentordermangement;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER', 'ADMIN', 'KITCHEN') NOT NULL DEFAULT 'CUSTOMER',
  phone VARCHAR(15) UNIQUE,
  status ENUM('ACTIVE','SUSPENDED','DELETED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
delete from users where id = 8;
insert into users (email, password, full_name,role,phone) values ("harshathunga3@gmail.com", "thvthvthv", "harshathunga", "ADMIN" ,9705355631);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE categories 
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE categories
MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

update users set role = "ADMIN" where id = 9;

insert into categories ( id , name, description, display_order) values (1, "BreakFast", "Soft and fluffy steamed rice cakes served with chutney and sambar.",1);

select id,name, is_active from categories where is_active = 1 order by display_order asc ;

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  preparation_time INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);


CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  special_instructions TEXT,
  delivery_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,

  status ENUM('pending','confirmed','preparing','delivered','cancelled') 
         DEFAULT 'pending',

  total_amount DECIMAL(10,2) NOT NULL,

  payment_status ENUM('pending','paid','failed','refunded') 
                DEFAULT 'pending',

  payment_intent_id VARCHAR(255),

  special_instructions TEXT,
  delivery_address TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
               ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,

  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,

  order_id INT NOT NULL,
  menu_item_id INT NULL,

  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,

  special_requests TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (order_id) 
    REFERENCES orders(id) 
    ON DELETE CASCADE,

  FOREIGN KEY (menu_item_id) 
    REFERENCES menu_items(id) 
    ON DELETE SET NULL,

  INDEX idx_order_id (order_id)
);



-- Order Items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  order_id INT,
  menu_item_id INT,
  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL,
  foreign Key (user_id) references users(id) ON DELETE CASCADE
);


insert into menu_items(category_id, name, description, price,image_url,is_vegetarian, preparation_time) values(1, "idile","Soft and fluffy steamed rice cakes served with chutney and sambar.", 10.00,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEF8t9le6UzAdPskkrhr_vpzArs-rRiP2ITA&s",true, 30);

insert into users (email, password, full_name,phone) values ("harshathunga@gmail.com", "thvthvthv", "harshathunga", 9705355630);
select * from users;