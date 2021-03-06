class User < ActiveRecord::Base
      mount_uploader :avatar, AvatarUploader
      has_many :posts, dependent: :destroy
      has_and_belongs_to_many :categories
      has_many :comments, dependent: :destroy
		  validates :username,
                :presence => true,
                :uniqueness => {
                :case_sensitive => false
                }
  # before_filter :configure_permitted_parameters, if: :devise_controller?
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
      devise :database_authenticatable, :registerable,
              :recoverable, :rememberable, :trackable, :validatable, :async
       after_create :welcome_message
      attr_accessor :login
      
  


def self.find_for_database_authentication(warden_conditions)
   conditions = warden_conditions.dup
    if login = conditions.delete(:login)
       where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
     else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
  end
end



  def welcome_message
     UserMailer.welcome_email(self).deliver_now
  end

end