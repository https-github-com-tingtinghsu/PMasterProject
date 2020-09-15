require 'net/http'
require 'uri'
require 'json'

  class Githubissue
    def issueCreate(title)
      uri = URI.parse("https://api.github.com/repos/https-github-com-tingtinghsu/practice_demo/issues?access_token=#{ENV["basekey"]}")
      request = Net::HTTP::Post.new(uri)
      request["Accept"] = "application/vnd.github.v3+json"
      request.body = JSON.dump({
        "title" => "#{title}",
        "body" => "Created by K3vinwei via PMaster.tw integration. 🎉"
      })
  
      req_options = {
        use_ssl: uri.scheme == "https",
      }
      
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
    end
  end


