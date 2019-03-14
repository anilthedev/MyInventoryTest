<?php

namespace App\Http\Controllers;

use App\Items;
use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use Carbon\Carbon;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ItemResource::collection(Items::orderBy('id', 'desc')->paginate(30));
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
        $this->validate($request, [
            'item_name' => 'required|max:255',
            'price' => 'required',
        ]);
        $item  = new Items();
        $input = $request->all();
        $input['created_at'] = Carbon::now();
        $item->fill($input);

        $item->save();

        return response()->json([
            'message' => 'Success'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function show(Items $item)
    {
        return new ItemResource($item);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function edit(Items $items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $this->validate($request, [
            'item_name' => 'required|max:255',
            'price' => 'required',
        ]);

        $item  = Items::find($id);
        $input = $request->all();
        $input['updated_at'] = Carbon::now();
        //$item->fill($input);

        $item->update($input);


        return response()->json([
            'message' => 'Item updated successfully!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $items  = Items::find($id);
        $items->delete();
        return response()->json([
            'message' => 'Item deleted successfully!'
        ], 200);
    }
}
