import { NextResponse } from 'next/server';
import data from '../../../data/inventory.json';

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let items = [...data]

    if (category) {
        items = items.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (search) {
        items = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase()));
    }

    const getStatus = (item) => {
        if (item.quantity_on_hand === 0) return 'Out of Stock';
        if (item.quantity_on_hand <= item.reorder_point) return 'Low Stock';
        return 'In Stock';
    }

    if (status) {
        items = items.filter((item) => getStatus(item) === status);
    }
    return NextResponse.json(items);
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, reorderpoint, notes } = body;

        if (!id) {
            return Response.json({ error: "ID required" }, { status: 400 });
        }

        const itemIndex = data.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
            return Response.json({ error: "Item not found" }, { status: 404 });
        } 

        // Update fields
        if (reorderpoint !== undefined) {
            data[itemIndex].reorder_point = Number(reorderpoint);
        }

        if (notes !== undefined) {
            data[itemIndex].notes = notes;
        }
        return Response.json(data[itemIndex]);
    } catch (err) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function POST(req) {
    const body = await req.json();
    const newItem = {
        id: `INV-${Date.now()}`,
        ...body,
    };
    data.push(newItem);
    return Response.json(newItem);
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
    return Response.json({ success: true });
}