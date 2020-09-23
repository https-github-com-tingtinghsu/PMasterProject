require 'net/http'
require 'uri'
require 'json'

class Github
  # 用來發布issue
  # ================================
  # title      => issue 名稱
  # user_token => 使用者 access_token
  # ================================  
  def issueCreate(title,user_token)

    #   取得 access_token 向後請求使用者資訊
    uri = URI.parse("https://api.github.com/user")
    request = Net::HTTP::Get.new(uri)
    request["Accept"] = "application/vnd.github.v3+json"
    request["Authorization"] = "token #{user_token}"

    req_options = {
        use_ssl: uri.scheme == "https",
      }
      
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
    end
    puts "取得User: "
    user_response = JSON.parse(response.body)
    puts user_response


    uri = URI.parse("https://api.github.com/repos/https-github-com-tingtinghsu/practice_demo/issues?access_token=#{user_token}")
    request = Net::HTTP::Post.new(uri)
    request["Accept"] = "application/vnd.github.v3+json"
    request.body = JSON.dump({
      "title" => "#{title}",
      "body" => "Created by #{user_response["login"]} via PMaster.tw integration. 🎉"
    })

    req_options = {
      use_ssl: uri.scheme == "https",
    }
    
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
  end

  # 用來取得user access_token
  # ================================ 
  # code => 使用者code
  # ================================
  def gettoken(code)
    puts "取得code: "
    # puts "https://github.com/login/oauth/access_token?client_id=#{ENV["gitclientid"]}&client_secret=#{ENV["gitclientsecret"]}&code=#{code}"
    uri = URI.parse("https://github.com/login/oauth/access_token?client_id=#{ENV["gitclientid"]}&client_secret=#{ENV["gitclientsecret"]}&code=#{code}")

    request = Net::HTTP::Post.new(uri)
    request["Accept"] = "application/json"

    req_options = {
      use_ssl: uri.scheme == "https",
    }
    
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
    parsed_json = JSON.parse(response.body)

    user_token = parsed_json["access_token"]
    puts "取得access_token: #{user_token}"

    return user_token
    
    # 測試 api
    # issueCreate("這是api產生的issue", user_token)
  end


end


