import { HistoryTable } from '@/configs/schema';
import { db } from '../../../configs/db' 
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function POST(req : Request) {
  const { recordId, content, userEmail, createdAt } = await req.json();
  const user = await currentUser();
  try {

    // Insert into HistoryTable
    const result = await db.insert(HistoryTable).values({
      recordId : recordId,
      content : content,
      userEmail : user?.primaryEmailAddress?.emailAddress,
    });

    return NextResponse.json({
      message: "History record created successfully",
      data: result,
    }, { status: 201 });
  } catch (error) {
    console.error("Error inserting history record:", error);
    return NextResponse.json({
      error: "Failed to create history record",
    }, { status: 500 });
    }
    }

    export async function PUT(req:any){
        const {content, recordId} = await req.json();
        try {

    // Insert into HistoryTable
    const result = await db.update(HistoryTable).set({
      content : content,
    }).where(eq(HistoryTable.recordId, recordId));

    return NextResponse.json({
      message: "History updated created successfully",
      data: result,
    }, { status: 201 });
  } catch (error) {
    console.error("Error updating history record:", error);
    return NextResponse.json({
      error: "Failed to update history record",
    }, { status: 500 });
    }
    }


    export async function GET(req: Request) {
        const { searchParams } = new URL(req.url);
        const recordId = searchParams.get('recordId');

        try{
            if(recordId){
                const result = await db.select().from(HistoryTable).where(eq(HistoryTable.recordId, recordId));
                return NextResponse.json(result[0])
            }
            return NextResponse.json({})
        } catch (error) {
            console.error("Error fetching history record:", error);
            return NextResponse.json({
                error: "Failed to fetch history record",
            }, { status: 500 });
        }
    }
