# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

### users-Association
- has_many :groups_users
- has_many :tweets
- has_many :groups, through: :groups_users
- add_index :email, unique:true

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### groups-Association
- has_many :groups_users
- has_many :tweets
- has_many :users, through: :groups_users

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|-------|
|image|string|-------|
|users_id|integer|null: false,foreign_key: true|
|groups_id|integer|null: false,foreign_key: true|

### tweets-Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### groups_users-Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
