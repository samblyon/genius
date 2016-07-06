class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  attr_accessor :login

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:username]


  validates :username,
     :presence => true,
     :uniqueness => {
       :case_sensitive => false
     }

  validate :validate_username

  has_many :annotations,
  foreign_key: :author_id,
  primary_key: :id,
  dependent: :destroy

  has_many :comments,
    foreign_key: :author_id,
    primary_key: :id,
    dependent: :destroy

  def validate_username
   if User.where(email: username).exists?
     errors.add(:username, :invalid)
   end
  end

  def email_required?
   false
  end

  def email_changed?
   false
  end


  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      conditions[:email].downcase! if conditions[:email]
      where(conditions.to_hash).first
    end
  end
end
