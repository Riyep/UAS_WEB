<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use Illuminate\Support\Facades\Http;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
        public static function getPublicHeadlines()
    {
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'apiKey' => '33313110a2354b63bfc5598af59fed15',
            'country' => 'id', // Change to the desired country code
        ]);

        return $response->json()['articles'];
    }


    public function searchNews($query)
    {
        $response = Http::get('https://newsapi.org/v2/everything', [
            'apiKey' => 'YOUR_NEWS_API_KEY',
            'q' => $query,
        ]);

        $searchResults = $response->json()['articles'];

        return Inertia::render('Search', [
            'searchResults' => $searchResults,
            'query' => $query,
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')-> paginate(9));
        return Inertia::render('homepage', [
            'title' => "KAMPUS NEWS HOME",
            'description' => "Selamat Datang Di KampusNews Universe",
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
//  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message', 'beritamu publish bro!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
       $myNews = $news::where('author',auth()->user()->email)->get();
       return Inertia::render('Dashboard', [
        'myNews' => $myNews
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard')->with('message', 'Update beria berhasil');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'beritamu berhasil dihapus!');
    }
}
